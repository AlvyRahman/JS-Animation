# Simple JS Animation Engine

A lightweight, high-performance animation engine built with JavaScript and HTML5 Canvas. This project focuses on **3D point projection** and **dynamic line rendering** in a 2D space.

## ✨ Features
* **3D to 2D Projection:** Maps 3D coordinates $(x, y, z)$ to a 2D screen using perspective division.
* **Responsive Canvas:** Automatically adapts to window resizing while maintaining the projection aspect ratio.
* **Low-Level Control:** Pure JavaScript implementation without external heavy libraries.

## 🚀 How to Run
Simply open `index.html` in any modern web browser.

## ⚙️ Customization
You can modify the points and animation behavior directly in `animation.js`:

* **Modify Points:** Update the `points` array to create different shapes (cubes, pyramids, etc.).
* **Change Speed:** Adjust the `fps` and `dt` (delta time) variables to speed up or slow down the motion.
* **Line Logic:** Use the `ctx.lineTo()` method within the `frame()` loop to connect your projected points.

## 📄 License
MIT