import SimpleReactFooter from "simple-react-footer";
import React from 'react';
const Footer = () => {
    const description = "Transform your life through education! Mohamad Alaloush launched a new career in software development by taking courses on Udemy. What will you be able to do?";
    const title = "Cats";
    const columns = [

    ];

    return (
        <div>
        <SimpleReactFooter
            description={description}
            columns={columns}
            linkedin="fluffy_cat_on_linkedin"
            facebook="fluffy_cat_on_fb"
            twitter="fluffy_cat_on_twitter"
            instagram="fluffy_cat_live"
            youtube="UCFt6TSF464J8K82xeA?"
            pinterest="fluffy_cats_collections"
            copyright="white"
            iconColor="white"
            backgroundColor="none"
            fontColor="white"
            copyrightColor="darkgrey"
        />
    </div>
    );
}
export default Footer;