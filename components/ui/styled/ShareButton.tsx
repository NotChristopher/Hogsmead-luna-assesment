import * as React from 'react';
import { Button } from 'react-native-paper';
import Share from 'react-native-share';

const ShareButton = () =>{
  
    const shareTo = async () => {
        console.log('hi');
        const shareOptions = {
            title: 'Share Link',
            message: 'Check out this amazing content!',
            url: 'https://example.com',
            social: Share.Social.FACEBOOK, // Choose any social platform here
          };
          try {
            await Share.shareSingle(shareOptions);
          } catch (error) {
            console.log('Error sharing link:', error);
          }
        }
    return(
        <>
        <Button mode="outlined" onPress={() => shareTo} > Share</Button>
        </>
    )
};

export default ShareButton;
