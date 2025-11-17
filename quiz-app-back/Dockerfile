# se define la imagen sobre la que correra la aplicacion
FROM node:lts-alpine

# añadiendo librerias extras
RUN npm install -g pnpm

# direccion de la carpeta de trabajo
WORKDIR /app

# copia el package.json y pnpm-lock.yaml dentro de la carpeta de trabajo, se copia por separado del
# resto del codigo ya que docker trabaja por capas, por ende, si esto no cambia, no se vuelven a reinstalar
# todas las dependencias
COPY package.json pnpm-lock.yaml ./

# instalar todas las dependencias de la app, --production instala solo las dependencias reales (no devDependencies)
RUN pnpm install --production

# copiamos el resto de los archivos de codigo en la carpeta de trabajo
COPY . .

# exponemos el puerto donde correra la app
EXPOSE 4000

# obligatorio para correr el contenedor no puede usarse RUN, es solo para build
CMD ["pnpm", "start"]