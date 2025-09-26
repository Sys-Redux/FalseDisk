import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, } from '@mui/material';

function NotFound() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate('/');
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                backgroundColor: 'background.default',
                color: 'text.primary',
                p: 3
            }}
        >
            <Typography variant="h2" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="h6" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Typography variant="body1" gutterBottom>
                You will be redirected to the <Link to="/">home page</Link> in {countdown} seconds.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
            >
                Go to Home Now
            </Button>
        </Box>
    );
}

export default NotFound;