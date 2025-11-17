# docker multi-stage
# se define la imagen sobre la que se hara el build, se le debe asignar un nombre con AS
FROM node:lts-alpine AS builder

# añadiendo librerias extras
RUN npm install -g pnpm

# direccion de la carpeta de trabajo
WORKDIR /app

# copia el package.json y pnpm-lock.yaml dentro de la carpeta de trabajo, se copia por separado del
# resto del codigo ya que docker trabaja por capas, por ende, si esto no cambia, no se vuelven a reinstalar
# todas las dependencias
COPY package.json pnpm-lock.yaml ./

# instalar todas las dependencias de la app, aqui --production no puede usarse porque necesitamos las devDependencies
# para poder hacer el build
RUN pnpm install

# copiamos el resto de los archivos de codigo en la carpeta de trabajo
COPY . .

# buildeando la app para obtener las paginas estaticas
RUN pnpm build

# segundo stage, a partir de aca lo de arrba ya no "existe" ya que es una cosa aparte
FROM nginx:alpine

# IMPORTANTE: el  --from=builder es necesario porque apartir del FROM nginx:alpine esto es una fase completamente
# aparte, por lo que la carpeta /app anterior en este punto no existe, con el flag lo que hacemos es decirle
# que se traiga esa carpeta del stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# exponemos el puerto donde correra la app
EXPOSE 80
