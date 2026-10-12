// PREtech logo: icon + wordmark.
export default function Brand({ className = "" }) {
  return (
    <span className={`brand ${className}`.trim()}>
      <img className="brand__mark" src="/brand/pretech-icon-128.png" alt="" width="128" height="128" />
      <span className="brand__name">
        PRE<b>tech</b>
      </span>
    </span>
  );
}
