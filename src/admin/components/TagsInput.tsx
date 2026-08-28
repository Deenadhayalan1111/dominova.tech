import { useState, useRef, type KeyboardEvent } from 'react';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagsInput({ value, onChange, placeholder = 'Type and press Enter' }: TagsInputProps) {
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const tag = inputVal.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInputVal('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputVal && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div
      className="adm-tags-wrap"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span key={tag} className="adm-tag-chip">
          {tag}
          <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>×</button>
        </span>
      ))}
      <input
        ref={inputRef}
        className="adm-tags-input"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKey}
        onBlur={addTag}
        placeholder={value.length === 0 ? placeholder : ''}
      />
    </div>
  );
}
