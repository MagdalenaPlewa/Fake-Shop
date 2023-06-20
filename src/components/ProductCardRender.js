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
                <Card sx={{ height: 500, width: 250, m: 2, p: 1, position: "relative", display: "flex", justifyContent:"center"}}>
                    <Link href={`/product/${id}`} style={styles.link}>
                      <CardMedia
                      component="img"
                      sx={{maxHeight: 330 }}
                      image={image}
                      alt={title}
                    />
                      <CardContent sx={{ p: 0, width: "100%", position: "absolute", bottom: 20, left: 0, display: "flex", flexWrap: "wrap", justifyContent: "center"}} >
                        <Typography variant="body2" component="div" sx={{ p: 3, width: "100%", textAlign: "center"}} >
                          {title}
                        </Typography>
                      </CardContent>
                    </Link>
                    <Box sx={{ position: "absolute", bottom: 10, mt: 1, textAlign: "center"}}>
                      <Typography sx={{color: "red", fontWeight: 'bold'}}>
                        {`${price.toFixed(2)} $`}
                      </Typography>
                        <Rating name="read-only" value={rating} precision={0.5}  size="small" readOnly/>  
                    </Box>
                </Card>
           </div>
        )
}