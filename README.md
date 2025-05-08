# Welcome to your Web Application Project

## Project Information

This is a modern web application built with a robust technology stack designed for optimal performance and developer experience. The project features a responsive user interface with clean, accessible design patterns.

## How can I edit this code?

There are several ways of editing your application.

**Use the Web Interface**

You can access and interact with the application through its web interface. Any changes made through the interface will be automatically committed to this repository.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project can be deployed to various hosting platforms such as Vercel, Netlify, or GitHub Pages. Each platform offers different features and benefits:

### Vercel Deployment
1. Create an account on Vercel if you don't have one
2. Connect your GitHub repository
3. Configure your build settings (typically automatic with Vite projects)
4. Deploy your application

### Netlify Deployment
1. Sign up for a Netlify account
2. Connect your GitHub repository
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Deploy your application

### GitHub Pages
1. Update your `vite.config.ts` to include the correct base path
2. Run `npm run build`
3. Deploy the `dist` folder to GitHub Pages

## Can I connect a custom domain to my project?

Yes, you can connect a custom domain to your deployed application!

Depending on your hosting provider, the process will vary slightly:

### Connecting a domain on Vercel
1. Go to your project settings in Vercel
2. Navigate to the Domains section
3. Add your custom domain
4. Update your DNS settings with your domain registrar

### Connecting a domain on Netlify
1. Go to your site settings in Netlify
2. Navigate to the Domain Management section
3. Click on "Add custom domain"
4. Follow the instructions to configure your DNS settings

### General DNS Configuration
- Set up an A record pointing to your hosting provider's IP address
- Alternatively, use a CNAME record pointing to your default deployment URL
- Allow 24-48 hours for DNS propagation to complete
