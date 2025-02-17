# Usar una imagen base de Node.js slim
FROM node:20-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install

# Copiar el resto de los archivos
COPY . .

# Puerto que expondrá la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start"] 