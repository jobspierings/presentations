window.onload = function() {
    var s = document.getElementsByTagName('div'), cur = 0, ti;
    var tr = 0;
    if (!s) return;
    function go(n) {
        cur = n;
        var i = 1e3, e = s[n], t;
        for (var k = 0; k < s.length; k++) s[k].style.display = 'none';
        e.style.display = 'inline';
        e.style.fontSize = i + 'px';
        if (e.firstChild.nodeName === 'IMG') {
            document.body.style.backgroundImage = 'url(' + e.firstChild.src + ')';
            e.firstChild.style.display = 'none';
            if ('classList' in e) e.classList.add('imageText');
        } else {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundColor = e.style.backgroundColor;
        }
        if (ti !== undefined) window.clearInterval(ti);
        t = parseInt(e.getAttribute('time-to-next') || 0, 10);
        if (t > 0) ti = window.setTimeout(fwd, (t * 1000));
        while (
            e.offsetWidth > window.innerWidth ||
            e.offsetHeight > window.innerHeight) {
            e.style.fontSize = (i -= 2) + 'px';
            if (i < 0) break;
        }
        e.style.marginTop = ((window.innerHeight - e.offsetHeight) / 2) + 'px';
        if (window.location.hash !== n) window.location.hash = n;
        document.title = e.textContent || e.innerText;
        
        var tw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2+ (-100 + Math.round(Math.random() * 200)),
            th = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2+ (-100 + Math.round(Math.random() * 200)),
            ts = Math.random() / 2 + 0.5;
        tr = tr + (-50 + Math.round(Math.random() * 100));
        d3.select('#graticules')
            .transition()
            .attr("transform", "translate(" + tw + "," + th + ")rotate(" + tr + ")scale("+ts+")");
      
                
    }
    document.onclick = function() { go(++cur % (s.length)); };
    function fwd() { go(Math.min(s.length - 1, ++cur)); }
    function rev() { go(Math.max(0, --cur)); }
    document.onkeydown = function(e) {
        if (e.which === 39) fwd();
        if (e.which === 37) rev();
    };
    document.ontouchstart = function(e) {
        var x0 = e.changedTouches[0].pageX;
        document.ontouchend = function(e) {
            var x1 = e.changedTouches[0].pageX;
            if (x1 - x0 < 0) fwd();
            if (x1 - x0 > 0) rev();
        };
    };
    function parse_hash() {
        return Math.max(Math.min(
            s.length - 1,
            parseInt(window.location.hash.substring(1), 10)), 0);
    }
    if (window.location.hash) cur = parse_hash() || cur;
    window.onhashchange = function() {
        var c = parse_hash();
        if (c !== cur) go(c);
    };

    go(cur);
    
    //d3.select('#graticules').data
    var GRATICULE_MIN = -2000,
        GRATICULE_MAX = 2000,
        GRATICULE_STEP = 100;
    for (var i=GRATICULE_MIN; i < GRATICULE_MAX; i+=GRATICULE_STEP) {
      
      d3.select('#graticules')
        .append('line')
          .classed('thick-graticule', i % (GRATICULE_STEP * 5) == 0)
          .attr('x1', i)
          .attr('y1', GRATICULE_MIN)
          .attr('x2', i)
          .attr('y2', GRATICULE_MAX);
          
      d3.select('#graticules')
        .append('line')
          .classed('thick-graticule', i % (GRATICULE_STEP * 5) == 0)
          .attr('x1', GRATICULE_MIN)
          .attr('y1', i)
          .attr('x2', GRATICULE_MAX)
          .attr('y2', i);
    
     
    }
    
    
    
};