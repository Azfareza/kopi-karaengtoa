document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Arabica Ciwidey', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Arabica Kintamani', img: '2.jpg', price: 30000 },
      { id: 3, name: 'Arabica Ethiopia', img: '3.jpg', price: 50000 },
      { id: 4, name: 'Arabica Toraja', img: '4.jpg', price: 25000 },
      { id: 5, name: 'Arabica Gayo', img: '5.jpg', price: 35000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // recheck quantity item di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // kalau belum ada / masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // kalau barang udah ada cek dulu barangnya udah ada atau belum?
        this.items = this.items.map((item) => {
          // kalau barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // kalau barang udah ada, tambah subtotalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yg mau di remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri satu - satu
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke  IDR
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
