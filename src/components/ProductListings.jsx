import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    CircularProgress,
    Chip
} from '@mui/material';
import { Add as AddIcon, Info as InfoIcon } from '@mui/icons-material';
import ProductDetails from './ProductDetails';

function ProductListings() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Get search query from URL parameters on initial render
    useEffect(() => {
        const query = searchParams.get('search') || '';
        setSearchQuery(query);
    }, [searchParams]);

    // Fetch products from FakeStoreAPI
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://fakestoreapi.com/products/category/electronics');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Search and filter products
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setSearchParams({});
    };

    // Navigate to Product Details
    const handleViewDetails = (productID) => {
        const product = products.find(p => p.id === productID);
        if (product) {
            setSelectedProduct(product);
            setModalOpen(true);
        }
    };

    // Close Modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }


    return (
        <Container maxWidth='lg' sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant='h3' component='h1' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    Product Listings
                </Typography>
                <Typography variant='h6' color='text.secondary'>
                    Explore the range of FalseDisk electronics
                </Typography>

                {/* Search Results */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <Typography variant='body1' color='text.secondary'>
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                        {searchQuery && ` for "${searchQuery}"`}
                    </Typography>

                    {searchQuery && (
                        <Chip
                            label={`Search: ${searchQuery}`}
                            onDelete={clearSearch}
                            color='primary'
                            variant='outlined'
                            size='small'
                        />
                    )}
                </Box>
            </Box>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4,
                                    }
                                }}
                            >
                                <CardMedia
                                    component='img'
                                    height='200'
                                    image={product.image}
                                    alt={product.title}
                                    sx={{ objectFit: 'contain', p: 2 }}
                                />
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography
                                        gutterBottom
                                        variant='h6'
                                        component='h2'
                                        sx={{
                                            fontWeight: 'bold',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {product.title}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            mb: 2,
                                            flexGrow: 1
                                        }}
                                    >
                                        {product.description}
                                    </Typography>
                                    <Typography variant='h6' color='primary.main' sx={{ fontWeight: 'bold' }}>
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ p: 2, flexDirection: 'column', gap: 1 }}>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        startIcon={<InfoIcon />}
                                        fullWidth
                                        onClick={() => handleViewDetails(product.id)}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        startIcon={<AddIcon />}
                                        fullWidth
                                    >
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant='h5' gutterBottom color='text.secondary'>
                        No products found
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                        {searchQuery
                            ? `No products match "${searchQuery}". Try searching something else.`
                            : 'No products available at the moment.'
                        }
                    </Typography>
                    {searchQuery && (
                        <Button
                            variant='outlined'
                            onClick={clearSearch}
                            sx={{ mt: 2 }}
                        >
                            Clear Search
                        </Button>
                    )}
                </Box>
            )}

            {/* Product Details Modal */}
            <ProductDetails
                open={modalOpen}
                product={selectedProduct}
                onClose={handleCloseModal}
            />
        </Container>
    );
}

export default ProductListings;