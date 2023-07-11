import React, {useEffect} from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchProductDetails } from "./Api"
import { selectedProduct } from "../redux/actions"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Box } from "@mui/material";
import { useState } from "react"


export const ProductDetails = () => {
    const product = useSelector(state => state.selectedProduct)

    const { image, title, price, description } = product
    const {id} = useParams()
    const dispatch = useDispatch()

    const detailsData = () => {
        fetchProductDetails(id).then(data => {
            dispatch(selectedProduct(data))
        })
    }
    useEffect(() => {
        detailsData()
    }, [id])

    return(
        <div key={id}>
            {Object.keys(product).length !== 0 ? (
                <Grid container sx={{p: 5, bgcolor: grey[100]}}>
                <Grid item xs={12} md={6}>
                    <Card sx={{p: 5}}>
                        <CardMedia
                        component="img"
                        image={image}
                        alt={title}
                         />
                     </Card>
                </Grid>
                <Grid item xs={12} md={6} sx={{p: 5}}>
                    <Typography gutterBottom variant="h6" component="div" sx={{mt: 3}}>
                        {title}
                    </Typography>
                    <Box sx={{m: 1, p: 2, }}>
                        <Typography variant="h5" sx={{color: "red", fontWeight: 'bold', m: 2}}>
                            {`${price.toFixed(2)} $`}
                        </Typography>

                        <Typography variant="body2">
                            {description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            ) : (
                <div>Loading....</div>
            )}

      </div>
    )
}