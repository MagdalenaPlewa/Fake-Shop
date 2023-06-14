import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, Rating } from "@mui/material";

export const ProductCardRender = ({id, title, image, price, rating}) => {
    const styles = { link: { textDecoration: "none", color: "black" }};
        return(
            <div key={id}>
                <Card sx={{ height: 460, maxWidth: 280, m: 2, p: 1, position: "relative", display: "flex", justifyContent:"center"}}>
                    <Link href={`/product/${id}`} style={styles.link}>
                      <CardMedia
                      component="img"
                      sx={{maxHeight: 330 }}
                      image={image}
                      alt={title}
                    />
                      <CardContent sx={{ p: 0, position: "absolute", bottom: 40, left: 0}} >
                        <Typography variant="body2" component="div" sx={{ p: 3, display: "flex", flexWrap: "wrap", justifyContent: "center"}} >
                          {title}
                        </Typography>
                      </CardContent>
                    </Link>
                    <Box sx={{ position: "absolute", bottom: 5}}>
                      <Typography sx={{color: "red", fontWeight: 'bold'}}>
                        {`${price.toFixed(2)} $`}
                      </Typography>
                        <Rating name="read-only" value={rating} precision={0.5}  size="small" readOnly/>  
                    </Box>
                </Card>
           </div>
        )
}