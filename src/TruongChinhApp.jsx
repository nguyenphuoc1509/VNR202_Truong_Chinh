import React, { useState, useRef, useEffect } from "react";

import {
    TruongChinhThemeStyles,
    TruongChinhParticleBackground,
} from "./truongChinhDataAndHooks";
import {
    TruongChinhNavbar,
    TruongChinhHeroSection,
    TruongChinhBiographySection,
    TruongChinhTimelineSection,
    TruongChinhIntroSection,
    TruongChinhContributionsSection,
    TruongChinhGallerySection,
    TruongChinhFooter,
    TruongChinhDoiMoiSection,
    TruongChinhLegacySection,
    TruongChinhModal,
} from "./truongChinhSections";

import narrationMp3 from "./assets/truong_chinh_ten_that_dang_xuan_khu_19071988_5d5601d2-863f-41e1-bbd0-dbe3911644c1.mp3";

export default function TruongChinhApp() {
    const [modal, setModal] = useState({ open: false, title: "", body: "" });
    const [highlightId, setHighlightId] = useState(null);

    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio(narrationMp3);
        const a = audioRef.current;
        a.onended = () => setPlaying(false);
        return () => {
            a.pause();
            a.onended = null;
        };
    }, []);

    const togglePlay = () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) {
            a.pause();
            setPlaying(false);
        } else {
            a.play();
            setPlaying(true);
        }
    };

    const handleSelectEvent = (m) => {
        setModal({ open: true, title: `${m.year} – ${m.title}`, body: m.text });
        if (m.year < 1941) setHighlightId("cach-mang");
        else if (m.year < 1954) setHighlightId("lanh-dao");
        else if (m.year < 1960) setHighlightId("ccrd");
        else if (m.year < 1985) setHighlightId("nhung-nam");
        else setHighlightId("cuoi-doi");
    };

    return (
        <div className="min-h-screen text-white bg-gradient-to-b from-[var(--bg-start)] via-[var(--bg-mid)] to-[var(--bg-end)]">
            <TruongChinhThemeStyles />
            <TruongChinhParticleBackground />
            <TruongChinhNavbar />

            <TruongChinhHeroSection onTogglePlay={togglePlay} playing={playing} />
            <TruongChinhIntroSection />

            <TruongChinhBiographySection highlightId={highlightId} />
            <TruongChinhContributionsSection />
            <TruongChinhGallerySection
                onOpenModal={(title, body) => setModal({ open: true, title, body })}
            />

            {/* Phần 2: Trường Chinh và Đổi mới */}
            <TruongChinhDoiMoiSection />

            <TruongChinhTimelineSection onSelect={handleSelectEvent} />
            <TruongChinhLegacySection />
            <TruongChinhFooter />

            <TruongChinhModal
                open={modal.open}
                onClose={() => setModal((s) => ({ ...s, open: false }))}
                title={modal.title}
            >
                <p>{modal.body}</p>
            </TruongChinhModal>
        </div>
    );
}
