import React, { useState } from 'react';

export default function BlockMenu() {
  const [activeBlock, setActiveBlock] = useState(null);
  function handleBlockClick(block) {
    setActiveBlock(block);
  }
  const blocks = [
    { title: 'Block 1', content: 'Content for block 1' },
    { title: 'Block 2', content: 'Content for block 2' },
    { title: 'Block 3', content: 'Content for block 3' },
  ];
  
  return (
    <div className="block-menu">
      {blocks.map((block, index) => (
        <button
          key={index}
          className={`block ${activeBlock === block ? 'active' : ''}`}
          onClick={() => handleBlockClick(block)}
        >
          {block.title}
        </button>
      ))}
    </div>
  );
}