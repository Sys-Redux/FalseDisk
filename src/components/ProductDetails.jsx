import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'auto',
    borderRadius: 2,
    outline: 'none'
};

function ProductDetails({ open, product, onClose }) {
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/add-product');
        onClose();
    };

    const handleEditProduct = () => {
        navigate('/edit-product', { state: { product } });
        onClose();
    };

    if (!product) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {/* Header w/ close button */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider'
                }}>
                    <Typography variant='h5' component='h1' sx={{ fontWeight: 'bold' }}>
                        Product Details
                    </Typography>
                    <IconButton onClick={onClose} size='large'>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Product Content */}
                <Box sx={{ p:3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'grey.50',
                                borderRadius: 1,
                                p: 2,
                                minHeight: 300
                            }}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </Box>
                        </Grid>

                        {/* Product Info */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box>
                                {/* Category */}
                                <Chip
                                    label={product.category}
                                    color='primary'
                                    variant='outlined'
                                    size='small'
                                    sx={{ mb: 2, textTransform: 'capitalize' }}
                                />
                                {/* Title */}
                                <Typography variant='h4' component='h2' gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {product.title}
                                </Typography>
                                {/* Rating */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Rating value={product.rating?.rate || 0} precision={0.1} readOnly />
                                    <Typography variant='body2' color='text.secondary' sx={{ ml: 1 }}>
                                        ({product.rating?.count || 0} reviews)
                                    </Typography>
                                </Box>
                                {/* Price */}
                                <Typography variant='h3' color='primary.main' sx={{ fontWeight: 'bold', mb: 3 }}>
                                    ${product.price}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Description */}
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                                    Description
                                </Typography>
                                <Typography variant='body1' color='text.secondary'>
                                    {product.description}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Action Buttons */}
                <Box sx={{
                    p: 3,
                    borderTop: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap'
                }}>
                    <Button
                        variant='outlined'
                        startIcon={<AddIcon />}
                        onClick={handleAddProduct}
                        sx={{ flex: 1, minWidth: 120 }}
                    >
                        Add Product
                    </Button>

                    <Button
                        variant='outlined'
                        startIcon={<EditIcon />}
                        onClick={handleEditProduct}
                        sx={{ flex: 1, minWidth: 120 }}
                    >
                        Edit Product
                    </Button>

                    <Button
                        variant='contained'
                        startIcon={<ShoppingCart />}
                        sx={{ flex: 2, minWidth: 160 }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ProductDetails;