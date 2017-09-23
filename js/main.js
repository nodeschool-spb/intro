(function () {
  /**
   * jQuery-like syntax for querySelector
   * 
   * @param  {!DOMString} query Simple CSS selector
   * @return {NodeList|Node}    List of nodes or once node of DOM
   */
  const $ = (query) => {
    const nodes = document.querySelectorAll(query)
    return nodes.length > 1 ? nodes : nodes[0]
  }

  /**
   * Pluralize russian words
   * 
   * @param  {!number} n Amount of a S
   * @param  {string} s1 When the S is a multiple of one
   * @param  {string} s2 When the S is a multiple of two
   * @param  {string} s5 When the S is a multiple of five
   * @return {string}    Returns a number with a suitable word
   */
  const plural = (n, s1, s2, s5) => (((n % 10) === 1) && ((n % 100) !== 11)) ? (s1) : (((((n % 10) >= 2) && ((n % 10) <= 4)) && (((n % 100) < 10) || ((n % 100) >= 20))) ? (s2) : (s5))

  /**
   * Pluralize years
   * 
   * @param  {!number} n                Number of years
   * @param  {Array<string>} translates Collection with three pluralize translates
   * @return {string}                   Returns pluralize year
   */
  const pluralYears = (n, translates) => plural(n, ...translates)

  /**
   * Calculate the difference between years
   * 
   * @param  {!Date} date End year
   * @return {number}     Difference
   */
  const getDiffYears = (date) => {
    const yearsDiffMs = Date.now() - date.getTime() // TODO check typeof Date
    const yearsDate = new Date(yearsDiffMs)
    const unixStartYear = 1970
    return Math.abs(yearsDate.getFullYear() - unixStartYear)
  }

  const renderAge = (node, date) => {
    const diff = getDiffYears(date)
    const plural = node.dataset.plural
    const arPlural = plural.split(',') // TODO check isset(data-plural)

    node.textContent = diff + ' ' + pluralYears(diff, arPlural)
  }

  const renderAges = () => {
    const dateStartNodeSchool = new Date(2013, 7, 17)
    const dateStartNodeSchoolSPb = new Date(2015, 5, 21)

    renderAge($('.nsc'), dateStartNodeSchool)
    renderAge($('.nscspb'), dateStartNodeSchoolSPb)
  }

  const iframeLazyLoad = () => {
    const iframe = $('iframe[data-src]')
    iframe.src = iframe.dataset.src
  }

  const main = () => {
    renderAges()
    iframeLazyLoad()
  }

  window.addEventListener('load', main)
})()
