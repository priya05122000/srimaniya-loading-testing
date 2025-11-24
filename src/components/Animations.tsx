// Animation configuration interface
export interface AnimationConfig {
    "data-aos": string;
    "data-aos-duration": string;
}

// Animation presets
export const ANIMATIONS = {
    fadeUp: { "data-aos": "fade-up", "data-aos-duration": "2000" },
    fadeDown: { "data-aos": "fade-down", "data-aos-duration": "2000" },
    fadeRight: { "data-aos": "fade-right", "data-aos-duration": "2000" },
    fadeLeft: { "data-aos": "fade-left", "data-aos-duration": "2000" },
    fadeUpRight: { "data-aos": "fade-up-right", "data-aos-duration": "2000" },
    fadeUpLeft: { "data-aos": "fade-up-left", "data-aos-duration": "2000" },
    fadeDownRight: { "data-aos": "fade-down-right", "data-aos-duration": "2000" },
    fadeDownLeft: { "data-aos": "fade-down-left", "data-aos-duration": "2000" },
    fadeZoomIn: { "data-aos": "fade-zoom-in", "data-aos-duration": "2000" },
    flipLeft: { "data-aos": "flip-left", "data-aos-duration": "2000" },
    flipRight: { "data-aos": "flip-right", "data-aos-duration": "2000" },
    flipUp: { "data-aos": "flip-up", "data-aos-duration": "2000" },
    flipDown: { "data-aos": "flip-down", "data-aos-duration": "2000" },
    zoomIn: { "data-aos": "zoom-in", "data-aos-duration": "2000" },
    zoomInUp: { "data-aos": "zoom-in-up", "data-aos-duration": "2000" },
    zoomInDown: { "data-aos": "zoom-in-down", "data-aos-duration": "2000" },
    zoomInLeft: { "data-aos": "zoom-in-left", "data-aos-duration": "2000" },
    zoomInRight: { "data-aos": "zoom-in-right", "data-aos-duration": "2000" },
    zoomOut: { "data-aos": "zoom-out", "data-aos-duration": "2000" },
    zoomOutUp: { "data-aos": "zoom-out-up", "data-aos-duration": "2000" },
    zoomOutDown: { "data-aos": "zoom-out-down", "data-aos-duration": "2000" },
    zoomOutRight: { "data-aos": "zoom-out-right", "data-aos-duration": "2000" },
    zoomOutLeft: { "data-aos": "zoom-out-left", "data-aos-duration": "2000" },
} as const;
