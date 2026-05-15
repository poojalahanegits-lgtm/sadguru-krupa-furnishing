import { useState, useRef } from "react";
const normalizeAmPm = (text) => {
  if (!text) return text;

  return String(text)
    .replace(/\bam\b/g, "AM")
    .replace(/\bpm\b/g, "PM");
};

const splitWorkLogs = (logs) => {
  if (!logs) return [];

  const text = normalizeAmPm(logs);

  return text.split(/(?=\[\d{1,2} .*?\])/g); // split by [date]
};

const getLatestWorkLog = (logs) => {
  const entries = splitWorkLogs(logs);
  return entries.length ? entries[entries.length - 1].trim() : "";
};

const WorkLogTooltip = ({ logs }) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef();

  if (!logs) return "-";

  const handleEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPos({
      top: rect.top,
      left: rect.right,
    });

    setShow(true);
  };

  const blocks = splitWorkLogs(logs);

  return (
    <>
      {/* SHORT TEXT (latest log) */}
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
        className="truncate cursor-pointer text-xs text-left"
      >
        {getLatestWorkLog(logs) || "-"}
      </div>

      {/* TOOLTIP */}
      {show && (
        <div
          className="fixed z-[9999] min-w-[350px] max-w-[390px] text-left max-h-[300px] overflow-auto bg-white border rounded-lg shadow-xl p-3 text-xs"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div className="space-y-3 whitespace-pre-wrap">
            {blocks.map((block, i) => {
              const match = block.match(/^\[(.*?)\]/);
              const header = match ? `[${match[1]}]` : "";
              const message = block.replace(/^\[(.*?)\]\s*/, "");

              return (
                <div key={i}>
                  <div className="text-gray-500">{header}</div>
                  <div className="font-semibold mt-1">{message}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkLogTooltip;
