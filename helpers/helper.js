function toRupiah (input) {
    let rupiah = Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    })
    return rupiah.format(input)
  }

  function sum (startups){
    let sum = 0;
    startups.forEach((el) => {
      sum += el.valuation
    })
    return sum
  }

module.exports = {
  toRupiah, sum
}
