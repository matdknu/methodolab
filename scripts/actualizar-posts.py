#!/usr/bin/env python3
"""
Script para actualizar posts.json desde archivos individuales en la carpeta Publicaciones

Uso: python scripts/actualizar-posts.py
"""

import json
import os
from pathlib import Path
from datetime import datetime

PUBLICACIONES_DIR = Path(__file__).parent.parent / 'Publicaciones'
POSTS_JSON = Path(__file__).parent.parent / 'posts.json'

def leer_publicaciones():
    """Lee todos los archivos JSON de la carpeta Publicaciones"""
    publicaciones = []
    
    if not PUBLICACIONES_DIR.exists():
        print('⚠️  La carpeta Publicaciones no existe. Creándola...')
        PUBLICACIONES_DIR.mkdir(parents=True, exist_ok=True)
        return publicaciones
    
    archivos_json = [f for f in PUBLICACIONES_DIR.glob('*.json') if f.name != 'README.md']
    
    print(f'📁 Encontrados {len(archivos_json)} archivos de publicaciones')
    
    for archivo in archivos_json:
        try:
            with open(archivo, 'r', encoding='utf-8') as f:
                publicacion = json.load(f)
            
            # Extraer fecha del nombre del archivo (YYYY-MM-DD.json)
            fecha_archivo = archivo.stem
            publicacion['fechaArchivo'] = fecha_archivo
            publicaciones.append(publicacion)
            
            print(f'  ✓ {archivo.name}')
        except Exception as e:
            print(f'  ✗ Error leyendo {archivo.name}: {e}')
    
    return publicaciones

def ordenar_por_fecha(publicaciones):
    """Ordena publicaciones por fecha (más reciente primero)"""
    return sorted(publicaciones, key=lambda x: x.get('fechaArchivo', ''), reverse=True)

def generar_posts_json(publicaciones):
    """Genera el array final de posts para posts.json"""
    # Separar destacado y regulares
    destacados = [p for p in publicaciones if p.get('featured') == True]
    regulares = [p for p in publicaciones if not p.get('featured')]
    
    # Si hay múltiples destacados, tomar solo el más reciente
    destacado = destacados[0] if destacados else None
    if destacado:
        print(f'⭐ Publicación destacada: {destacado.get("title", "Sin título")}')
    
    # Combinar: destacado primero, luego regulares
    todos_los_posts = []
    if destacado:
        todos_los_posts.append(destacado)
    todos_los_posts.extend(regulares)
    
    # Asignar IDs secuenciales
    posts_con_id = []
    for index, post in enumerate(todos_los_posts):
        nuevo_post = post.copy()
        nuevo_post['id'] = index + 1
        nuevo_post.pop('fechaArchivo', None)  # Eliminar campo temporal
        posts_con_id.append(nuevo_post)
    
    return posts_con_id

def main():
    print('🚀 Actualizando posts.json...\n')
    
    # Leer publicaciones de la carpeta
    publicaciones = leer_publicaciones()
    
    if not publicaciones:
        print('⚠️  No se encontraron publicaciones en la carpeta Publicaciones')
        print('   Crea archivos JSON con formato YYYY-MM-DD.json')
        return
    
    # Ordenar por fecha
    publicaciones_ordenadas = ordenar_por_fecha(publicaciones)
    
    # Generar posts.json
    posts_json = generar_posts_json(publicaciones_ordenadas)
    
    # Escribir posts.json
    try:
        with open(POSTS_JSON, 'w', encoding='utf-8') as f:
            json.dump(posts_json, f, indent=2, ensure_ascii=False)
        
        destacados = sum(1 for p in posts_json if p.get('featured'))
        regulares = len(posts_json) - destacados
        
        print(f'\n✅ posts.json actualizado con {len(posts_json)} publicaciones')
        print(f'   - Destacado: {destacados}')
        print(f'   - Regulares: {regulares}')
    except Exception as e:
        print(f'❌ Error escribiendo posts.json: {e}')
        exit(1)

if __name__ == '__main__':
    main()





