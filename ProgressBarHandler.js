window.onload = function () {
  const circular_progress_bars = document.getElementsByClassName("r-progress");

  const doAnimation = (
    progress_bar,
    progress,
    lineColor,
    bgColor,
    timing,
    temp_progress = 0
  ) => {
    if (temp_progress <= progress) {
      setTimeout(() => {
        progress_bar.style.background = `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(${lineColor} ${temp_progress}%, ${bgColor} 0)`;
        doAnimation(
          progress_bar,
          progress,
          lineColor,
          bgColor,
          timing,
          temp_progress + 1
        );
      }, timing);
    }
  };

  Array.from(circular_progress_bars).forEach((progress_bar) => {
    progress_bar.style.aspectRatio = "1";
    progress_bar.style.borderRadius = "50%";
    progress_bar.style.display = "flex";
    progress_bar.style.justifyContent = "center";
    progress_bar.style.alignItems = "center";
    progress_bar.style.flexDirection = "column";
    const backgroundColor = progress_bar.getAttribute("bg-color");
    const lineColor = progress_bar.getAttribute("line-color");
    const progress = progress_bar.getAttribute("progress");
    const progresstext = document.createElement("p");
    progresstext.innerHTML = progress;
    progress_bar.appendChild(progresstext);

    if (parseInt(progress) === 0) {
      progress_bar.style.background = `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(${lineColor} 0%, ${backgroundColor} 0)`;
    } else if (progress.includes("%")) {
      let n_prog = parseInt(progress);
      if (!isNaN(n_prog)) {
        const timing = progress_bar.getAttribute("delay") / n_prog;
        doAnimation(progress_bar, n_prog, lineColor, backgroundColor, timing);
      } else {
        console.error("Invalid percentage!!");
      }
    } else if (progress === "100%") {
      let n_prog = 100;
      const timing = progress_bar.getAttribute("delay");
      doAnimation(progress_bar, n_prog, lineColor, backgroundColor, timing);
    } else {
      const n_prog = parseInt(progress);
      if (!isNaN(n_prog)) {
        const timing = progress_bar.getAttribute("delay") / n_prog;
        doAnimation(progress_bar, n_prog, lineColor, backgroundColor, timing);
      } else {
        console.error("Invalid progress value!!");
      }
    }
  });
};
