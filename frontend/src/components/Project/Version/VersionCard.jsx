import { BsDiagram2 } from "react-icons/bs";

const VersionCard = ({ version, onClick }) => {
  const {
    name,
    description,
    createdAt,
    createdBy,
    diagrams = [],
  } = version || {};

  return (
    <div
      onClick={() => onClick(version)}
      className="min-w-[250px] w-full bg-white dark:bg-gray-900 border border-purple-300 dark:border-gray-700 rounded-lg p-4 shadow transition hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-primary font-semibold text-lg truncate max-w-[70%]">
          {name || "Untitled Version"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {description && (
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {description}
        </p>
      )}

      <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-2">
        <div className="flex items-center gap-1">
          <BsDiagram2 size={20} />
          <span>{diagrams.length} diagrams</span>
        </div>
      </div>

      {createdBy?.name && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Created by <span className="font-medium">{createdBy.name}</span>
        </p>
      )}
    </div>
  );
};

export default VersionCard;
