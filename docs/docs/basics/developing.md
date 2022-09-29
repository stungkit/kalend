---
sidebar_position: 9
---

# Developing

To use kalend in development follow these steps:

- run ```npm run build``` from kalend root 
- run ```npm link``` from kalend build folder
- delete ```react-dom``` and ```react``` from node_modules of kalend 

  ```rm -r -f kalend/node_modules/react-dom```

  ```rm -r -f kalend/node_modules/react```
- link kalend in your project ```npm link kalend```
- after each update you need to rebuild kalend from root with ```npm run build```
