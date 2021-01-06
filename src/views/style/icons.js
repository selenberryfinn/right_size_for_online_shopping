import React from "react";

export const Bell = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
    );
};

export const Camera = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
        </svg>
    );
};

export const Cart = ({ title, color, strokeWidth, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
    );
};

export const ChevronDown = ({ title, color, strokeWidth, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>

            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

export const ChevronLeft = ({ title, color, strokeWidth, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
    );
};

export const ChevronRight = ({ title, color, strokeWidth, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    );
};

export const CornerUpRight = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <polyline points="15 14 20 9 15 4"></polyline>
            <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
        </svg>
    );
};
export const Clock = ({ title, color, height, width, strokeWidth }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );
};
export const Edit2 = ({ title, color, height, width, strokeWidth }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
    );
};

export const Globe = ({ title, strokeWidth, color, width, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    );
};

export const Home = ({ title, strokeWidth, color, width, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    );
};

export const Image = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
    );
};

export const MessageCircle = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
    );
};

export const Plus = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );
};

export const MessageSquare = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    );
};

export const Phone = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            className="image image--loader thumb"
            data-pin-no-hover="true"
            preserveAspectRatio="xMidYMid slice"
        >
            <title>{title}</title>
            <image
                width="24"
                height="24"
                xlinkHref="https://image.flaticon.com/icons/png/128/126/126509.png"
            ></image>
        </svg>
    );
};
export const Search = ({ title, color, fill, strokeWidth }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill={fill || "none"}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>

            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );
};

export const Repeat = ({ title, strokeWidth, color, width, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </svg>
    );
};

export const ThumbsUp = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            {" "}
            <title>{title}</title>
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
    );
};

export const Truck = ({ title, strokeWidth, color, width, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
    );
};

export const Tshirt = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            className="image image--loader thumb"
            data-pin-no-hover="true"
            preserveAspectRatio="xMidYMid slice"
        >
            <title>{title}</title>
            <image
                width="24"
                height="24"
                xlinkHref="https://image.flaticon.com/icons/png/128/103/103972.png"
            ></image>
        </svg>
    );
};

export const User = ({ title, color }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke={color || "black"}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );
};

export const Users = ({ title, strokeWidth, color, width, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    );
};

export const X = ({ title, strokeWidth, color, width, height }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width || "24"}
            height={height || "24"}
            stroke={color || "black"}
            strokeWidth={strokeWidth || "1"}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="css-i6dzq1"
        >
            <title>{title}</title>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
};
