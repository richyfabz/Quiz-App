#  Richard Quiz App

A clean, interactive quiz application built with vanilla HTML, CSS, and JavaScript. Test your knowledge with a dynamic question-answer interface featuring instant feedback and score tracking.

## Features

- **Dynamic Question Loading** - Questions and answers are dynamically generated
- **Interactive UI** - Smooth transitions and hover effects for better user experience
- **Instant Feedback** - See if your answer is correct or incorrect immediately
- **Score Tracking** - Keep track of your performance throughout the quiz
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Clean Interface** - Minimalist design with Font Awesome icons

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Live Server extension (for development)

### Installation

1. Clone or download this repository
```bash
git clone https://github.com/yourusername/quiz-app.git
```

2. Navigate to the project folder
```bash
cd quiz-app
```

3. Open with Live Server
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or simply open `index.html` in your browser

## Project Structure

```
Quiz-App/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # Quiz logic and interactivity
└── README.md           # Project documentation
```

## How to Use

1. Click the **"Start Quiz"** button to begin
2. Read each question carefully
3. Select your answer from the available options
4. Click **"Next Question"** to proceed
5. View your final score at the end

## 🛠️ Technologies Used

- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6)** - Quiz logic and DOM manipulation
- **Font Awesome** - Icons for enhanced UI

## 🎨 Customization

### Adding Your Own Questions

Edit the questions array in `script.js`:

```javascript
const questions = [
    {
        question: "Your question here?",
        answers: [
            { text: "Option 1", correct: false },
            { text: "Option 2", correct: true },
            { text: "Option 3", correct: false },
            { text: "Option 4", correct: false }
        ]
    },
    // Add more questions...
];
```

### Changing Colors

Modify the CSS variables in `style.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --background-color: #your-color;
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Richard**

- GitHub: [@richyfabz](https://github.com/richyfabz)

## 🙏 Acknowledgments

- Font Awesome for the icon library
- Inspiration from various quiz applications
- Tutorial guide used for learning purposes

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

⭐ Star this repo if you found it helpful!