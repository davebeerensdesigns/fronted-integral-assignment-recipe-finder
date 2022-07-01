import React, {useEffect, useState} from 'react';
import PageTitle from "../../../components/titles/PageTitle";
import UserService from "../../../services/user.service";
import Loader from "../../../components/loader/Loader";
import RecipeFavoritesArchive from "../../../components/archive/RecipeFavoritesArchive";

function Favorites() {

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const baseLink = '/favorites';

    useEffect(() => {
        const getUsername = async () => {
            setLoading(true)
            await UserService.getUserDetails().then(
                (response) => {
                    setUsername(response.data.username ? response.data.username : 'unknown user')
                    setLoading(false)
                })
                .catch(
                    () => {
                        setUsername('unknown user')
                        setLoading(false)
                    });
        }
        getUsername()
    }, []);

    return (
        <div id='page-favorite__recipes'>

            <PageTitle title='Favorite recipes'/>

            {loading && (
                <Loader />
            )}
            {!loading && (
                <RecipeFavoritesArchive title={username} apiFor='favorites' baseLink={baseLink} />
            )}

        </div>
    );
}

export default Favorites;