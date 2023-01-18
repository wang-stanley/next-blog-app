// Loading Spinner
export default function Loader({ show }) {
  return show ? (
    <div className="border-8 border-t-blue-600 border-white rounded-full w-14 h-14 animate-spin"></div>
  ) : null;
}