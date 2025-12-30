#!/usr/bin/env Rscript

# Script para renderizar publicaciones desde R usando Quarto
# 
# Uso:
#   Rscript scripts/renderizar-desde-r.R
#   Rscript scripts/renderizar-desde-r.R Publicaciones-QMD/2025-01-15-analisis-psu

library(quarto)

# Directorio base del proyecto
proj_dir <- normalizePath(getwd())
publicaciones_dir <- file.path(proj_dir, "Publicaciones-QMD")
output_dir <- file.path(proj_dir, "publicaciones")

# Función para renderizar una publicación
renderizar_publicacion <- function(carpeta) {
  qmd_file <- file.path(carpeta, "index.qmd")
  
  if (!file.exists(qmd_file)) {
    warning(paste("No se encontró index.qmd en:", carpeta))
    return(FALSE)
  }
  
  # Nombre de la publicación desde el nombre de la carpeta
  nombre_pub <- basename(carpeta)
  
  # Leer el frontmatter para obtener el link
  contenido <- readLines(qmd_file, warn = FALSE)
  frontmatter_start <- which(grepl("^---$", contenido))[1]
  frontmatter_end <- which(grepl("^---$", contenido))[2]
  
  if (is.na(frontmatter_start) || is.na(frontmatter_end)) {
    warning(paste("No se encontró frontmatter válido en:", qmd_file))
    return(FALSE)
  }
  
  frontmatter <- contenido[(frontmatter_start + 1):(frontmatter_end - 1)]
  
  # Extraer el link
  link_line <- grep("^link:", frontmatter, value = TRUE)
  if (length(link_line) == 0) {
    warning(paste("No se encontró 'link' en frontmatter de:", qmd_file))
    return(FALSE)
  }
  
  link <- gsub('^link:\\s*["\']?([^"\']+)["\']?\\s*$', '\\1', link_line)
  output_file <- file.path(proj_dir, link)
  output_dir_pub <- dirname(output_file)
  
  # Crear directorio de salida si no existe
  if (!dir.exists(output_dir_pub)) {
    dir.create(output_dir_pub, recursive = TRUE)
  }
  
  # Renderizar con Quarto
  cat("Renderizando:", qmd_file, "\n")
  cat("Salida:", output_file, "\n")
  
  tryCatch({
    quarto::quarto_render(
      input = qmd_file,
      output_file = basename(output_file),
      output_dir = output_dir_pub
    )
    cat("✓ Renderizado exitosamente:", output_file, "\n")
    return(TRUE)
  }, error = function(e) {
    warning(paste("Error renderizando", qmd_file, ":", e$message))
    return(FALSE)
  })
}

# Función principal
main <- function(args = commandArgs(trailingOnly = TRUE)) {
  if (length(args) > 0) {
    # Renderizar publicación específica
    carpeta <- args[1]
    if (!dir.exists(carpeta)) {
      carpeta <- file.path(publicaciones_dir, carpeta)
    }
    if (!dir.exists(carpeta)) {
      stop(paste("No se encontró la carpeta:", args[1]))
    }
    renderizar_publicacion(carpeta)
  } else {
    # Renderizar todas las publicaciones
    cat("Buscando publicaciones en:", publicaciones_dir, "\n")
    
    if (!dir.exists(publicaciones_dir)) {
      stop(paste("No existe el directorio:", publicaciones_dir))
    }
    
    carpetas <- list.dirs(publicaciones_dir, recursive = FALSE, full.names = TRUE)
    carpetas <- sort(carpetas)
    
    cat("Encontradas", length(carpetas), "publicaciones\n\n")
    
    exitosos <- 0
    fallidos <- 0
    
    for (carpeta in carpetas) {
      if (renderizar_publicacion(carpeta)) {
        exitosos <- exitosos + 1
      } else {
        fallidos <- fallidos + 1
      }
      cat("\n")
    }
    
    cat("Resumen:\n")
    cat("  Exitosos:", exitosos, "\n")
    cat("  Fallidos:", fallidos, "\n")
  }
}

# Ejecutar
if (!interactive()) {
  main()
}

