import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteProduct from './DeleteProduct';

function AddProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product || null;
    const isEditing = !!product;
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [savedProduct, setSavedProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (product) {
            // product passed as prop (editing in modal)
            setFormData({
                title: product.title || '',
                price: product.price || '',
                description: product.description || '',
                image: product.image || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setLoading(true);
        setError(null);

        // Check if all fields are filled
        if (!e.target.checkValidity()) {
            setLoading(false);
            return;
        }

        // Logic to Add or Edit
        try {
            const url = isEditing
                ? `https://fakestoreapi.com/products/${product.id}`
                : 'https://fakestoreapi.com/products';

            const method = isEditing ? 'put' : 'post';

            const response = await axios[method](url, {
                ...formData,
                price: parseFloat(formData.price)
            });

            setSavedProduct(response.data);
            setError(null);

            setTimeout(() => {
                navigate('/products');
            }, 2000);
        } catch (err) {
            setError(`Error ${isEditing ? 'updating' : 'adding'} product: ${err.message}`);
            setSubmitted(false);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSuccess = () => {
        navigate('/products');
    };


    return (
        <Container maxWidth='md' sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/products')}
                        variant='outlined'
                        size='small'
                        sx={{ mb: 2 }}
                    >
                        Back to Products
                    </Button>

                    <Typography variant='h3' component='h1' gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {submitted && savedProduct && (
                    <Alert severity='success' sx={{ mb: 3 }}>
                        {savedProduct.title} {isEditing ? 'updated' : 'added'} successfully!
                    </Alert>
                )}

                {error && (
                    <Alert severity='error' sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label='Product Title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder='Enter product title'
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label='Price'
                                name='price'
                                type='number'
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder='0.00'
                                slotProps={{
                                    htmlInput: {
                                        min: '0',
                                        step: '0.01'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label='Description'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                required
                                multiline
                                rows={4}
                                placeholder='Enter product description'
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label='Image URL'
                                name='image'
                                type='url'
                                value={formData.image}
                                onChange={handleChange}
                                required
                                placeholder='https://example.com/image.jpg'
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                                {isEditing && (
                                    <DeleteProduct
                                        productId={product.id}
                                        onDeleteSuccess={handleDeleteSuccess}
                                    />
                                )}

                                <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
                                    <Button
                                        variant='outlined'
                                        onClick={() => navigate('/products')}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                                        disabled={loading}
                                    >
                                        {loading
                                            ? (isEditing ? 'Updating...' : 'Adding...')
                                            : (isEditing ? 'Update Product' : 'Add Product')
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default AddProduct;
