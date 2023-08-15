/* eslint-disable react/prop-types */
import { useState } from 'react';
import "./HiPager.css"

const HiPager = ({ amount, onPageChange=()=>{}, options={} }) => {
  var Options = {
    buttonsToShow: options.buttonsToShow || 5,
    perPage: options.perPage || 10,
    defaultPage: options.defaultPage || 1,
  }

  const [currentPage, setCurrentPage] = useState(Options.defaultPage);
  var totalPages = (amount / Options.perPage);
  // if(Options.perPage > amount) {totalPages = Options.perPage = amount}
  if ((totalPages % 1).toString().includes(".")) {
    let still = 1 - (totalPages % 1);
    totalPages = totalPages + still;
  }
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };
  
  const goToSpecificPage = () => {
    const input = prompt('Enter a page number:');
    const pageNumber = parseInt(input);
    if (!isNaN(pageNumber)) {
      goToPage(pageNumber);
    }
  };

  if (Options.defaultPage > totalPages) {
    goToPage(1);
  }

  const renderButtons = () => {
    
    if (Options.buttonsToShow % 2 == 0) {
      Options.buttonsToShow++;
    }
    const maxLeft = Math.floor((Options.buttonsToShow - 1) / 2);
    const maxRight = Math.ceil((Options.buttonsToShow - 2) / 2);
    let firstButton = currentPage - maxLeft;
    let lastButton = currentPage + maxRight;

    if (firstButton <= 0) {
      firstButton = 1;
      lastButton = Options.buttonsToShow;
    }

    if (lastButton > totalPages) {
      firstButton = totalPages - (Options.buttonsToShow - 1);
      lastButton = totalPages;

      if (firstButton <= 0) {
        firstButton = 1;
      }
    }

    const buttons = [];

    const addButton = (text, key, onClick, className) => (
      buttons.push(
        <button
          key={`${key}-button`} onClick={onClick}
          className={`pagination-button ${className}`}
        >{text}</button>
      )
    );

    addButton('<', "prev", () => goToPage(currentPage - 1), currentPage === 1 ? 'disabled' : '');
    addButton('1', "first", () => goToPage(1), currentPage === 1 ? 'active' : '');

    if (firstButton > 2) {
      addButton('...', "dots-1", goToSpecificPage);
    }

    for (let i = firstButton; i <= lastButton; i++) {
      if(![1, totalPages].includes(i)){
        addButton(i, `${i}-button`, () => goToPage(i), i === currentPage ? 'active' : '');
      }
    }

    if (lastButton < totalPages-1) {
      addButton('...', "dots-2", goToSpecificPage);
    }

    addButton(totalPages, "last", () => goToPage(totalPages), currentPage === totalPages ? 'active' : '');
    addButton('>', "next", () => goToPage(currentPage + 1), currentPage === totalPages ? 'disabled' : '');

    return buttons;
  };

  return (
    <div className="pagination-container">
      <div className="pagination-buttons" style={{ display: Options.perPage >= amount ? 'none' : '' }}>
        {renderButtons()}
      </div>
    </div>
  );
};

export default HiPager;
