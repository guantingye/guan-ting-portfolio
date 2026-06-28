import React from 'react';
import { ICONS } from '../../data/icons.js';
import { FiAward } from 'react-icons/fi';

export default function Icon({ name, className = '' }) {
    const Component = ICONS[name] || FiAward;
    return React.createElement(Component, {
        className: `icon-svg ${className}`,
        'aria-hidden': 'true',
        focusable: 'false',
    });
}
