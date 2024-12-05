# Gunakan image Node.js sebagai base image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json (jika ada)
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy semua file dari folder app dan public
COPY app/ ./app

COPY public/ ./public

# Expose port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "app/server.js"]