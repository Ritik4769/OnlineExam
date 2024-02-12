import React from "react";
import CelebrationSlider from "./CelebrationSlider";
import VisitSlider from "./VisitSlider";
import CenterSlider from './CenterSlider';
import TeachingSider from './TeachingSlider';

export default function GalleryPage() {
    return (
        <>
            <CelebrationSlider />
            <CenterSlider />
            <VisitSlider />
            <TeachingSider />
        </>
    );
}