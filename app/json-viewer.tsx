import { cx } from "class-variance-authority";
import React from "react";

export interface JsonViewerProps {
  children: React.ReactNode;
  className?: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        "h-fit bg-[#1D1D20] border border-[#9c9696] border-opacity-10 overflow-hidden rounded-xl flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface JsonViewerHeaderProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export const JsonViewerHeader: React.FC<JsonViewerHeaderProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <div className={cx("bg-[#18181B] flex", "px-4 py-3", className)}>
      {title && <p>{title}</p>}
      {children}
    </div>
  );
};

export interface JsonViewerContentProps {
  children?: React.ReactNode;
  className?: string;
  json: string;
  keyColor?: string;
  valueColor?: string;
  bracketColor?: string;
  marginMultiplier?: number;
}

export const JsonViewerContent: React.FC<JsonViewerContentProps> = ({
  children,
  json,
  keyColor = "#6BB0D2",
  valueColor = "#64CEA5",
  bracketColor = "#FFFFFF",
  marginMultiplier = 6,
  className,
}) => {
  const lines = json.split("\n");

  function put(line: string, space: number) {
    if (line === "") return null;

    const brackets = ["{", "}", "[", "]", ","];
    const key = line.split(":")[0];
    let value = line.split(":")[1];

    if (value && line.split(":").length > 2) {
      value = line.split(":").slice(1).join(":");
    }

    let spans = [];

    if (line.split(":").length == 1 && !line.includes('"')){
      spans.push(
        <span key={key} style={{ color: bracketColor }}>
          {line}
        </span>
      );
    } else {
      if (key) {
        const firstChar = key[0];
        const lastChar = key[key.length - 1];
        const keyString =
          firstChar &&
          lastChar &&
          key.length >= 2 &&
          key.slice(1, key.length - 1);

        if (firstChar) {
          if (brackets.includes(firstChar)) {
            spans.push(
              <span key={key} style={{ color: bracketColor }}>
                {firstChar}
              </span>
            );
          } else {
            spans.push(
              <span key={key} style={{ color: keyColor }}>
                {firstChar}
              </span>
            );
          }
        }

        if (keyString) {
          spans.push(
            <span key={key} style={{ color: keyColor }}>
              {keyString}
            </span>
          );
        }

        if (lastChar) {
          if (brackets.includes(lastChar)) {
            spans.push(
              <span key={key} style={{ color: bracketColor }}>
                {lastChar}
                {value && ":"}
              </span>
            );
          } else {
            spans.push(
              <span key={key} style={{ color: keyColor }}>
                {lastChar}
                <span style={{ color: bracketColor }}>{value && ":"}</span>
              </span>
            );
          }
        }
      }

      if (value) {
        const firstChar = value[0];
        const lastChar = value[value.length - 1];
        const valueString =
          firstChar &&
          lastChar &&
          value.length >= 2 &&
          value.slice(1, value.length - 1);

        if (firstChar) {
          if (brackets.includes(firstChar)) {
            spans.push(
              <span key={key} style={{ color: bracketColor }}>
                {firstChar}
              </span>
            );
          } else {
            spans.push(
              <span key={key} style={{ color: valueColor }}>
                {firstChar}
              </span>
            );
          }
        }

        if (valueString) {
          spans.push(
            <span key={key} style={{ color: valueColor }}>
              {valueString}
            </span>
          );
        }

        if (lastChar) {
          if (brackets.includes(lastChar)) {
            spans.push(
              <span key={key} style={{ color: bracketColor }}>
                {lastChar}
              </span>
            );
          } else {
            spans.push(
              <span key={key} style={{ color: valueColor }}>
                {lastChar}
              </span>
            );
          }
        }
      }
    }
    return (
      <p
        style={{ paddingLeft: `calc(${space}px * ${marginMultiplier})` }}
        key={key}
      >
        {spans}
      </p>
    );
  }

  return (
    <div className="flex">
      <div className={cx("my-3 mx-4 text-sm", className)}>
        {lines.map((line) => {
          if (line === "") return null;
          return put(line, line.search(/\S/));
        })}
      </div>
      {children}
    </div>
  );
};
