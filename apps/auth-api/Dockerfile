FROM node:20-alpine

WORKDIR /app

# Copy workspace files from repo root (build must use the repository root as the build context)
COPY /pnpm-workspace.yaml ./
COPY /pnpm-lock.yaml ./
COPY /package.json ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy app source
COPY . .

EXPOSE 3000

CMD ["npx", "nx", "run", "auth-api:serve", "--configuration=production"]

