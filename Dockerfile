FROM node:alpine

COPY node_modules node_modules
COPY dist dist
COPY package.json .

# Expose port
EXPOSE 8001

# Start the app
CMD ["npm", "start"]
