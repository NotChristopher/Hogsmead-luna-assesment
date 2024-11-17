import * as React from 'react';
import { Button } from 'react-native-paper';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';

const ShareButton = ({src}) =>{
    const {house} = useSelector(state => state.quiz);
    const shareTo = async () => {
        console.log('hi');
        const shareOptions = {
            title: 'Share Link',
            message: 'I am house ' + house,
            social: Share.Social.WHATSAPP, // Choose any social platform here
          };
          try {
            await Share.shareSingle(shareOptions);
          } catch (error) {
            console.log('Error sharing link:', error);
          }
        }
    return(
        <>
        <Button mode="outlined" onPress={() => shareTo()} > Share</Button>
        </>
    )
};

export default ShareButton;
