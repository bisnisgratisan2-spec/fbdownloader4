let sd = $('meta[property="og:video:secure_url"]').attr('content') ||
$('meta[property="og:video"]').attr('content') || null;


// fallback: look for playable_url and playable_url_quality_hd in JS
if(!sd){
const sdMatch = html.match(/"playable_url":"(https:[^\"]+)"/);
const hdMatch = html.match(/"playable_url_quality_hd":"(https:[^\"]+)"/);
sd = sdMatch ? tryUnescape(sdMatch[1]) : null;
var hd = hdMatch ? tryUnescape(hdMatch[1]) : null;
} else {
// if sd found in meta, try to locate hd from scripts
const hdMatch2 = html.match(/"playable_url_quality_hd":"(https:[^\"]+)"/);
var hd = hdMatch2 ? tryUnescape(hdMatch2[1]) : null;
}


// Another fallback: JSON LD or window-prefetched data
if(!sd){
const m = html.match(/"stream_url":"(https:[^\"]+)"/);
if(m) sd = tryUnescape(m[1]);
}


if(!sd && !hd){
return res.status(400).json({ error: 'Tidak dapat mengambil URL video. Mungkin private atau diblokir.' });
}


return res.json({ sd: sd || null, hd: hd || null });


} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error: ' + err.message });
}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on port', PORT));
```
