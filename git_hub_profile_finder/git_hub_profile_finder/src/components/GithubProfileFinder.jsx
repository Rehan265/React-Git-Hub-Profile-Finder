import { Box, Button, Card, CardActions, CardContent, CardMedia, LinearProgress, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const GithubProfileFinder = () => {

    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        try {
            setError(null);
            setUserData(null);
            setIsLoading(true);
            const responce = await axios.get(`https://api.github.com/users/${userName}`);
            setUserData(responce.data);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleOnClick = () => {
        fetchUserData();
    }

    return (
        <>
            {
                isLoading && <LinearProgress />
            }
            <Typography variant="h3" textAlign={"center"} marginTop={2} fontWeight={"bold"}>Github Profile Finder</Typography>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={1} marginTop={2}>
                <TextField value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter User Name" sx={{ width: "500px" }} />
                <Button onClick={handleOnClick} variant="contained" color="secondary">Search</Button>
            </Box>
            {
                error ? <Typography marginTop={2} variant="h3" textAlign={"center"} color="error">{error}</Typography> : <Box display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={3}>
                    {
                        userData && <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={userData?.avatar_url}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {userData?.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {userData?.bio}
                                </Typography>
                                <Box display={"flex"} gap={1}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Followers: {userData?.followers}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Following: {userData?.following}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Location: {userData?.location}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">
                                    <a target="_blank" href={userData?.html_url}>
                                        Go To GitHub
                                    </a>
                                </Button>
                            </CardActions>
                        </Card>
                    }
                </Box>
            }
        </>
    )
}


export default GithubProfileFinder