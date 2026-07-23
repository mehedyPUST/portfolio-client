const projects = [
    {
        id: 1,
        name: 'E‑Commerce Platform',
        image: '/project1.jpg',
        tech: 'Next.js, MongoDB, Stripe',
        description:
            'Full‑stack online store with cart, payment, and admin panel.',
        live: 'https://your-live-link.com',
        github: 'https://github.com/yourgithub/ecommerce-client',
        challenges:
            'Implementing real‑time stock management and secure payment flow.',
        improvements: 'Add AI product recommendations, improve SEO.',
    },
    {
        id: 2,
        name: 'Task Manager API',
        image: '/project2.jpg',
        tech: 'Express, MongoDB, JWT',
        description:
            'RESTful API for task management with authentication and role‑based access.',
        live: 'https://api-demo.example.com',
        github: 'https://github.com/yourgithub/task-manager-api',
        challenges:
            'JWT refresh token rotation, request validation and rate limiting.',
        improvements: 'Add GraphQL interface, improve error logging.',
    },
    {
        id: 3,
        name: 'Portfolio Website',
        image: '/project3.jpg',
        tech: 'Next.js, Framer Motion, Nodemailer',
        description:
            'The very portfolio you are viewing – built with modern animations and dark mode.',
        live: '#',
        github: 'https://github.com/yourgithub/portfolio',
        challenges:
            'Custom cursor performance and scroll‑based animation sync.',
        improvements: 'Add blog section, integrate CMS, add dark mode toggle.',
    },
];

export default projects;