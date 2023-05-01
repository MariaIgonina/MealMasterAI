import React from "react";
import {
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";

export const ShareButton: React.FC = ({ diet }) => {
  const getShareUrl = (dietId: number) => {
    console.log(diet)
    return `${window.location.origin}/diet/${dietId}`;
  };

  return (
    <div className="share-buttons">
      <WhatsappShareButton
        url={getShareUrl(diet.id)}
        quote={`Check out this diet plan created using AI tech: ${diet.mealInfo.title}`}
        hashtag="#YourAppHashtag"
        className="whatsapp-share-button"
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url={getShareUrl(diet.id)}
        title={`Check out this diet plan created using AI tech: ${diet.mealInfo.title}`}
        hashtags={["YourAppHashtag"]}
        className="twitter-share-button"
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <EmailShareButton
        url={getShareUrl(diet.id)}
        className="email-share-button"
        subject={`Check out this diet plan created using AI tech: ${diet.mealInfo.title}`}
        body={`Hey, I found this diet plan and thought you might be interested: ${getShareUrl(
          diet.id
        )}
        
        The diet:
        
         ${diet.description}`}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
};