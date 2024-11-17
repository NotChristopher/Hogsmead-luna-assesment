import * as React from 'react';
import { Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import Share from 'react-native-share';
import { useSelector } from 'react-redux';

interface ShareButtonProps {
  src: string;
}

interface RootState {
  quiz: {
    house: string;
  };
}

const ShareButton = ({ src }: ShareButtonProps) => {
  const { house } = useSelector((state: RootState) => state.quiz);

  const shareTo = async () => {
    console.log('hi');
    const shareOptions = {
      title: 'Share Link',
      message: `I am house ${house}`,
      social: Share.Social.WHATSAPP,
    };

    try {
      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.log('Error sharing link:', error);
    }
  };

  return (
    <Button mode="outlined" onPress={shareTo} style={styles.button}>
      Share
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    borderRadius: 4,
  },
});

export default ShareButton;
