'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

export default function CompanionCard({ id, name, topic, subject, duration, color }: CompanionCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
        console.log('Bookmark toggled:', id, !isBookmarked);
    };

    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            {/* Card content */}
            <div className="flex justify-between items-center">
                <div className="subject-badge capitalize">{subject}</div>
                <button 
                    className={`companion-bookmark transition-all ${isBookmarked ? 'bg-yellow-500' : ''}`}
                    onClick={handleBookmark}
                    type="button"
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                >
                    <Image 
                        src="/icons/bookmark.svg" 
                        alt="bookmark" 
                        width={12.5} 
                        height={15}
                        style={{ filter: isBookmarked ? 'invert(1)' : 'none' }}
                    />
                </button>
            </div>

            <h2 className="companion-name">{name}</h2>
            <p className="companion-topic">{topic}</p>

            <div className="flex items-center gap-2 mt-auto">
                <Image src="/icons/clock.svg" alt="duration" width={13.5} height={13.5} />
                <span>{duration} min</span>
            </div>

            {/* Launch Lesson Link */}
            <Link 
                href={`/companions/${id}`}
                className="launch-lesson-btn block text-center mt-4"
                prefetch={true}
            >
                Launch Lesson
            </Link>
        </article>
    );
}
