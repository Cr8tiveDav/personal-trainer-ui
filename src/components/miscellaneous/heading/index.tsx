interface Properties {
<<<<<<< HEAD
  tag: string
  title: string
  content: string
}

const renderTitle = (title: string) => {
  const parts = title.split(/({{[^}]+}})/).filter(Boolean)

  return parts.map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const styledText = part.slice(2, -2)
      return (
        <span key={index} className="text-orange-500">
          {styledText}
        </span>
      )
    }
    return <span key={index}>{part}</span>
  })
}
=======
  tag: string;
  title: string;
  content: string;
}

const renderTitle = (title: string) => {
  const parts = title.split(/({{[^}]+}})/).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const styledText = part.slice(2, -2);
      return (
        <span key={index} className='text-orange-500'>
          {styledText}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
>>>>>>> 3df50710cbafcb38552223fbef89a114a358e285

const Heading = (properties: Properties) => {
  return (
    <div
<<<<<<< HEAD
      className="mx-auto mb-6 flex max-w-7xl flex-col items-center px-4 text-center md:mb-16"
      data-testid="about-header"
    >
      <p
        className="mb-6 inline-block rounded-full bg-[#EDF4FD] px-4 py-1.5 text-sm font-medium text-[#063660] md:text-base"
        data-testid="about-tag"
=======
      className='mx-auto mb-6 flex max-w-7xl flex-col items-center px-4 text-center md:mb-16'
      data-testid='about-header'
    >
      <p
        className='mb-6 inline-block rounded-full bg-[#EDF4FD] px-4 py-1.5 text-sm font-medium text-[#063660] md:text-base'
        data-testid='about-tag'
>>>>>>> 3df50710cbafcb38552223fbef89a114a358e285
      >
        {properties?.tag}
      </p>

      <h2
<<<<<<< HEAD
        className="font-inter mx-auto mb-4 max-w-5xl whitespace-pre-line text-center text-3xl font-bold leading-[1.2] tracking-tight text-gray-900 md:text-5xl md:leading-[1.1] lg:text-[64px]"
        data-testid="about-title"
=======
        className='font-inter mx-auto mb-4 max-w-5xl whitespace-pre-line text-center text-3xl font-bold leading-[1.2] tracking-tight text-gray-900 md:text-5xl md:leading-[1.1] lg:text-[64px]'
        data-testid='about-title'
>>>>>>> 3df50710cbafcb38552223fbef89a114a358e285
      >
        {renderTitle(properties.title)}
      </h2>

      <p
<<<<<<< HEAD
        className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl"
        data-testid="about-description"
=======
        className='mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl'
        data-testid='about-description'
>>>>>>> 3df50710cbafcb38552223fbef89a114a358e285
      >
        {properties?.content}
      </p>
    </div>
<<<<<<< HEAD
  )
}

export default Heading
=======
  );
};

export default Heading;
>>>>>>> 3df50710cbafcb38552223fbef89a114a358e285
