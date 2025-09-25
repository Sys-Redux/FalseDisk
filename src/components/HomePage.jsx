import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
    ShoppingCart,
    Speed,
    Security,
    Support,
    Store
} from '@mui/icons-material';

function HomePage() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  const features = [
    {
        icon: <Speed fontSize='large' color='primary' />,
        title: 'Fastest Gear',
        description: 'Experience blazing fast performance with our cutting-edge hardware.'
    },
    {
        icon: <Security fontSize='large' color='primary' />,
        title: 'Secure Shopping',
        description: 'Shop with confidence knowing you will receive genuine fake products.'
    },
    {
        icon: <Support fontSize='large' color='primary' />,
        title: '24/7 Support',
        description: 'Our support team is here to help you anytime, anywhere.'
    },
    {
        icon: <Store fontSize='large' color='primary' />,
        title: 'Wide Selection',
        description: 'Choose from a vast array of the latest and greatest in FakeTech.'
    }
  ];

  return (
    <Box>
        {/* Hero Section */}
        <Box
        sx={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #4796bb 0%, #4e1c81 100%)',
            color: 'white'
        }}
        >
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '2px 2px 4px rgba(26, 28, 36, 0.5)'
                }}
            >
                Welcome to FalseDisk
            </Typography>

            <Typography
                variant="h5"
                component="p"
                sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
            >
                An online computer store offering the latest & greatest in FakeTech
            </Typography>

            <Button
                variant="contained"
                size="large"
                onClick={handleShopNow}
                startIcon={<ShoppingCart />}
                sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                    bgcolor: '#4796bb',
                }
                }}
            >
                Shop Now
            </Button>
            </Box>
        </Container>
        </Box>

        {/* Features Cards Section */}
        <Container maxWidth='lg' sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant='h4' component='h2' gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Why FalseDisk?
                </Typography>
                <Typography variant='body1' color='textSecondary' sx={{ maxWidth: 600, mx: 'auto' }}>
                    Discover the benefits of shopping with us
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    justifyContent: 'center',
                    alignItems: 'stretch'
                }}
            >
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        elevation={3}
                        sx={{
                            flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' },
                            minHeight: 200,
                            maxWidth: { xs: '100%', md: 300 },
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: 6,
                            }
                        }}
                    >
                        <CardContent sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            justifyContent: 'space-between'
                        }}>
                            <Box>
                                <Box sx={{ mb: 2 }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant='h6' component='h3' gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant='body2' color='textSecondary' sx={{ mt: 2 }}>
                                    {feature.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    </Box>
  );
}

export default HomePage;