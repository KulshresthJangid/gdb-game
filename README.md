# Betting Game 🎲💰

The **Betting Game** is an exciting casino-style game that allows users to place bets, play slot games, and experience a virtual casino environment. This project is currently under development, and we're working hard to bring new features and enhancements to it.

---

## Status 🚧

**Under Development**

This project is a work-in-progress, and new features will be added regularly. Stay tuned for updates!

---

## Features (Planned) ✨

- **User Authentication**: Secure login and registration system.
- **Betting System**: Users will be able to place bets on different games.
- **Slot Games Integration**: Play slot machine games through an external API.
- **User Wallet**: Manage balance, track wins and losses.
- **Leaderboard**: Compete with other players.
- **Game History**: View detailed records of game outcomes and betting history.

---

## Table of Contents 📚

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Installation 🛠️

To set up the project locally:

### 1. Star the Repository

First, star this repository by clicking the ⭐️ at the top of the page.

### 2. Fork the Repository

Next, fork the repository by clicking the "Fork" button at the top right.

### 3. Clone the Repository

After forking, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/gdb-game.git
cd gdb-game
```

### 4. Backend and Frontend Setup

## Backend Setup

### Prerequisites

Before starting the backend, ensure you have the following prerequisites installed:

- **MariaDB or MySQL**: Install MariaDB or MySQL to set up the SQL database.
- **MongoDB**: Install MongoDB for non-relational data.

### Setup Instructions

1. **Install Dependencies**

   Navigate to the backend directory and install the necessary dependencies:

   ```bash
   cd backend
   npm install
   ```
2. **Environment Variables**
   Create a .env file in the backend directory and add the following variables
   ```bash
    MONGO_URL=mongodb://localhost:27017
    MONGO_DB_NAME=bettingDb
    SQL_HOST=localhost
    SQL_USER=root
    SQL_PASS=root
    SQL_DB_NAME=bettingDB
    SQL_PORT=3309
    EMAIL_USER=bdgbetting@gmail.com
    EMAIL_APP_PASS=wwsh axib kshn abzf
    JWT_KEY=youknowyourdaddyishomehomeformeandiknowyouvebeenwaiting
    ```
3. **Run the Development Server**
   ```bash
   npm run dev
   ```
      

