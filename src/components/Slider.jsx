import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import { sliderItems } from "../Data";
import Picture from "./Picture";
import { imageInfo } from "../images";
import { mobile, tablet } from "../responsive";
import {
  gsap,
  useGSAP,
  Observer,
  SplitText,
  prefersReducedMotion,
} from "../gsap";
import { ButtonLink } from "./Button";

const AUTOPLAY_SECONDS = 6;

// Displayed image width, from its proportions: 92% of the slide's height on
// desktop, about half the screen height when stacked on tablets and phones.
const heroSizes = (name) => {
  const { width, height } = imageInfo(name);
  const vh = (share) => `${Math.round((share * width) / height)}vh`;
  return `(max-width: 1023px) ${vh(50)}, ${vh(92)}`;
};

const Container = styled.section`
  height: 100vh;
  overflow: hidden;
  position: relative;
  touch-action: pan-y;
  user-select: none;
  width: 100%;
  ${mobile({ height: "85svh" })}
`;

const Arrow = styled.button`
  align-items: center;
  background-color: #f7f9f9;
  border: none;
  border-radius: 50%;
  bottom: 0;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  left: ${(props) => props.$direction === "left" && "10px"};
  right: ${(props) => props.$direction === "right" && "10px"};
  margin: auto;
  opacity: 0.6;
  position: absolute;
  top: 0;
  transition: opacity 0.3s ease;
  width: 50px;
  z-index: 2;
  ${mobile({ display: "none" })}

  &:hover,
  &:focus-visible {
    opacity: 1;
  }
`;

// Slides are stacked; GSAP shows the active one and animates between them.
// Image and text form one group, centered in the slide. On tablets and
// phones they stack: image on top, text below.
const stackedSlide = {
  flexDirection: "column",
  gap: "0",
  padding: "20px 0 70px",
};

const Slide = styled.div`
  align-items: center;
  display: flex;
  gap: 5vw;
  inset: 0;
  justify-content: center;
  padding: 0 80px;
  position: absolute;
  visibility: hidden;
  ${tablet(stackedSlide)}
  ${mobile(stackedSlide)}

  &:first-child {
    visibility: visible;
  }
`;

const stackedImage = { height: "55%", justifyContent: "center", width: "100%" };

// The models are cropped at the bottom of their photos, so they stand on the
// bottom edge of the slide.
const ImgContainer = styled.div`
  align-items: flex-end;
  align-self: stretch;
  display: flex;
  flex: none;
  ${tablet(stackedImage)}
  ${mobile(stackedImage)}
`;

const Image = styled(Picture)`
  height: 92%;
  ${tablet({ height: "100%" })}
  ${mobile({ height: "100%" })}
`;

const InfoContainer = styled.div`
  flex: 0 1 640px;
  padding: 10px 0;
  ${tablet({ flex: "none", padding: "0 40px", textAlign: "center" })}
  ${mobile({ flex: "none", padding: "0 24px", textAlign: "center" })}
`;

const Title = styled.h1`
  font-size: 60px;
  ${tablet({ fontSize: "50px" })}
  ${mobile({ fontSize: "30px" })}
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 2px;
  ${tablet({ fontSize: "20px", margin: "16px 0 24px" })}
  ${mobile({ fontSize: "15px", letterSpacing: "1px", margin: "12px 0 20px" })}
`;

// Light pill behind the dots so they stay readable over a photo.
const Controls = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 20px;
  bottom: 24px;
  display: flex;
  gap: 10px;
  left: 50%;
  padding: 7px 12px;
  position: absolute;
  transform: translateX(-50%);
  z-index: 2;
`;

const Dot = styled.button`
  background-color: ${(props) =>
    props["aria-current"] ? "#090909" : "rgba(9, 9, 9, 0.25)"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 10px;
  padding: 0;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
  width: ${(props) => (props["aria-current"] ? "28px" : "10px")};
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  color: #090909;
  cursor: pointer;
  display: flex;
  margin-left: 6px;
  padding: 0;
`;

const Slider = () => {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const splitsRef = useRef([]);
  const currentRef = useRef(0);
  const timelineRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());

  const { contextSafe } = useGSAP(
    () => {
      const slides = slidesRef.current;
      gsap.set(containerRef.current, {
        backgroundColor: `#${sliderItems[0].bg}`,
      });
      gsap.set(slides, { autoAlpha: (i) => (i === 0 ? 1 : 0) });

      const reduce = prefersReducedMotion();
      // Titles are split into masked lines so they can slide up into view.
      // autoSplit re-splits after the web font loads or the layout changes.
      splitsRef.current = slides.map((slide, i) =>
        SplitText.create(slide.querySelector("h1"), {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          // Intro for the first slide. The image stays visible so it can
          // paint (and count as the page's main content) right away.
          onSplit: (self) =>
            i === 0 && !reduce
              ? gsap
                  .timeline({ defaults: { ease: "power3.out" } })
                  .from(self.lines, {
                    yPercent: 100,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power4.out",
                  })
                  .from(
                    slide.querySelectorAll("[data-slide-fade]"),
                    { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
                    0.4
                  )
              : undefined,
        })
      );

      // Swipe (touch) or drag (mouse) horizontally to change slides.
      Observer.create({
        target: containerRef.current,
        type: "touch,pointer",
        tolerance: 50,
        ignore: "a, button",
        onLeft: () => !timelineRef.current?.isActive() && next(),
        onRight: () => !timelineRef.current?.isActive() && previous(),
      });
    },
    { scope: containerRef }
  );

  const goTo = contextSafe((target, direction) => {
    const from = currentRef.current;
    if (target === from) return;

    // Finish any transition still running before starting the next one.
    timelineRef.current?.progress(1);
    currentRef.current = target;
    setIndex(target);

    const outgoing = slidesRef.current[from];
    const incoming = slidesRef.current[target];
    const background = `#${sliderItems[target].bg}`;

    if (prefersReducedMotion()) {
      gsap.set(outgoing, { autoAlpha: 0 });
      gsap.set(incoming, { autoAlpha: 1 });
      gsap.set(containerRef.current, { backgroundColor: background });
      return;
    }

    const outgoingParts = outgoing.querySelectorAll(
      "[data-slide-image], [data-slide-info]"
    );

    timelineRef.current = gsap
      .timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(outgoing, { autoAlpha: 0 });
          gsap.set(outgoingParts, {
            clearProps: "transform,opacity,visibility",
          });
        },
      })
      .to(outgoingParts, {
        x: -60 * direction,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(
        containerRef.current,
        { backgroundColor: background, duration: 0.8, ease: "power1.inOut" },
        0
      )
      .set(incoming, { autoAlpha: 1 }, 0.4)
      .from(
        incoming.querySelector("[data-slide-image]"),
        { x: 80 * direction, autoAlpha: 0, duration: 0.9 },
        0.4
      )
      .from(
        splitsRef.current[target].lines,
        { yPercent: 100, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        0.5
      )
      .from(
        incoming.querySelectorAll("[data-slide-fade]"),
        { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 },
        0.7
      );
  });

  const next = () => goTo((currentRef.current + 1) % sliderItems.length, 1);
  const previous = () =>
    goTo(
      (currentRef.current - 1 + sliderItems.length) % sliderItems.length,
      -1
    );

  // Autoplay. While the pointer is over the slider or a keyboard user is
  // focused inside it, wait another round instead of advancing.
  useEffect(() => {
    if (!playing) return;
    let call;
    const tick = () => {
      const container = containerRef.current;
      const paused =
        container.matches(":hover") ||
        container.querySelector(":focus-visible");
      call = paused ? gsap.delayedCall(AUTOPLAY_SECONDS, tick) : null;
      if (!paused) next();
    };
    call = gsap.delayedCall(AUTOPLAY_SECONDS, tick);
    return () => call?.kill();
  }, [index, playing]);

  return (
    <Container
      ref={containerRef}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <Arrow
        type="button"
        $direction="left"
        aria-label="Previous slide"
        onClick={previous}
      >
        <KeyboardArrowLeftIcon />
      </Arrow>
      <div aria-live={playing ? "off" : "polite"}>
        {sliderItems.map((item, i) => (
          <Slide
            key={item.id}
            ref={(element) => (slidesRef.current[i] = element)}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${sliderItems.length}`}
          >
            <ImgContainer data-slide-image>
              <Image
                name={item.img}
                alt={item.alt}
                sizes={heroSizes(item.img)}
                draggable={false}
                {...(i === 0 ? { fetchPriority: "high" } : { loading: "lazy" })}
              />
            </ImgContainer>
            <InfoContainer data-slide-info>
              <Title>{item.title}</Title>
              <Desc data-slide-fade>{item.desc}</Desc>
              <ButtonLink to="/productlist" $size="lg" data-slide-fade>
                SHOP SALE
              </ButtonLink>
            </InfoContainer>
          </Slide>
        ))}
      </div>
      <Arrow
        type="button"
        $direction="right"
        aria-label="Next slide"
        onClick={next}
      >
        <KeyboardArrowRightIcon />
      </Arrow>
      <Controls>
        {sliderItems.map((item, i) => (
          <Dot
            key={item.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => goTo(i, i > index ? 1 : -1)}
          />
        ))}
        <PlayButton
          type="button"
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </PlayButton>
      </Controls>
    </Container>
  );
};

export default Slider;
