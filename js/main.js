(function() {
  const $ = (q) => {
    const nodes = document.querySelectorAll(q)
    return nodes.length > 1 ? [...nodes] : nodes[0]
  }

  const plural = (n, s1, s2, s5) => (((n % 10) == 1) && ((n % 100) != 11)) ? (s1) : (((((n % 10) >= 2) && ((n % 10) <= 4)) && (((n % 100) < 10) || ((n % 100) >= 20))) ? (s2) : (s5))

  const pluralYears = (n) => plural(n, 'год', 'года', 'лет')

  const getDiffYears = (date) => {
    var yearsDiffMs = Date.now() - date.getTime()
    var yearsDate = new Date(yearsDiffMs)
    var unixStartYear = new Date(0).getUTCFullYear()
    return Math.abs(yearsDate.getUTCFullYear() - unixStartYear)
  }

  const renderAge = () => {
    var nscYears = getDiffYears(new Date(2013, 7, 17))
    var nscspbYears = getDiffYears(new Date(2015, 5, 21))

    $('.nsc').textContent = nscYears + ' ' + pluralYears(nscYears)
    $('.nscspb').textContent = nscspbYears + ' ' + pluralYears(nscspbYears)
  }

  const iframeLazyLoad = () => {
    const iframe = $('iframe[data-src]')
    iframe.src = iframe.dataset.src
  }

  const main = () => {
    renderAge()
    iframeLazyLoad()
  }

  window.addEventListener("load", main)
})()