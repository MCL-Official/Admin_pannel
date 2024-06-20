      closeText: 'Затвори'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навигација низ страници',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Оди на '}страница ${page}`;
          }
          if (type === 'first') {
            return 'Оди на прва страница';
          }
          if (type === 'last') {
            return 'Оди на последна страница';
          }
          if (type === 'next') {
            return 'Оди на следна страница';
          }
          // if (type === 'previous') {
          return 'Оди на предходна страница';
        }
      }
    }
  }
};

// Myanmar - မြန်မာ
export const myMY = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'လမ်းကြောင်းပြပါ။'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: type => {
          if (type === 'first') {
            return 'ပထမစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'last') {
            return 'နောက်ဆုံးစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'next') {
            return 'နောက်စာမျက်နှာသို့သွားပါ။';
          }
          // if (type === 'previous') {
          return 'ယခင်စာမျက်နှာသို့သွားပါ။';
        },
        labelRowsPerPage: 'စာမျက်နှာအလိုက် အတန်းများ:',
        labelDisplayedRows: ({
          from,
          to,
          count
        }) => `${from}–${to} ၏ ${count !== -1 ? count : `ထက်ပိုပြီး ${to}`}`
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: value => {
          const lastDigit = value % 10;
          return `${value} ကြယ်ပွင့်${lastDigit === 1 ? '၎' : ''}`;
        },
        emptyLabelText: 'ဗလာ'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'ရှင်းလင်းသော',
        closeText: 'ပိတ်လိုက်',
        loadingText: 'ဖွင့်နေသည်…',
        noOptionsText: 'ရွေးချယ်ခွင့်မရှိပါ။',
        openText: 'ဖွင့်သည်။'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'ပိတ်လိုက်'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Pagination အညွှန်း',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'သွားပါ။ '}စာမျက်နှာ ${page}`;
          }
          if (type === 'first') {
            return 'ပထမစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'last') {
            return 'နောက်ဆုံးစာမျက်နှာသို့သွားပါ။';
          }
          if (type === 'next') {
            return 'နောက်စာမျက်နှာသို့သွားပါ။';
          }
          // if (type === 'previous') {
          return 'ယခင်စာမျက်နှာသို့သွားပါ။';
        }
      }
    }
  }
};

// Malay-Melayu
export const msMS = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Tunjukkan laluan'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: type => {
          if (type === 'first') {
            return 'Pergi ke halaman pertama';
          }
          if (type === 'last') {
            return 'Pergi ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Pergi ke halaman seterusnya';
          }
          // if (type === 'previous') {
          return 'Pergi ke halaman sebelumnya';
        },
        labelRowsPerPage: 'Baris setiap halaman:',
        labelDisplayedRows: ({
          from,
          to,
          count
        }) => `${from}–${to} daripada ${count !== -1 ? count : `lebih daripada ${to}`}`
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: value => {
          const lastDigit = value % 10;
          return `${value} Bintang${lastDigit === 1 ? 's' : ''}`;
        },
        emptyLabelText: 'kosong'
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Jelas',
        closeText: 'tutup',
        loadingText: 'Memuatkan…',
        noOptionsText: 'Tiada pilihan',
        openText: 'Buka'
      }
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'tutup'
      }
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigasi penomboran',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Pergi ke '}muka surat ${page}`;
          }
          if (type === 'first') {
            return 'Pergi ke halaman pertama';
          }
          if (type === 'last') {
            return 'Pergi ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Pergi ke halaman seterusnya';
          }
          // if (type === 'previous') {
          return 'Pergi ke halaman sebelumnya';
        }
      }
    }
  }
};

// Nepali-नेपाली
export const neNP = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'बाटो देखाउनुहोस्'
      }
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: type => {
          if (type === 'first') {
            return 'पहिलो पृष्ठमा जानुहोस्';
          }
          if (type === 'last') {
            return 'अन्तिम पृष्ठमा जानुहोस्';
          }
          if (type === 'next') {
            return 'अर्को पृष्ठमा जानुहोस्';
          }
          // if (type === 'previous') {
          return 'अघिल्लो पृष्ठमा जानुहोस्';
        },
        labelRowsPerPage: 'प्रति पृष्ठ पङ्क्तिहरू:',
        labelDisplayedRows: ({
          from,
          to,
          count
        }) => `${from}–${to} को ${count !== -1 ? count : `धेरै ${to}`}`
      }
    },
    MuiRating: {
      defaultProps: {
        getLabelText: value