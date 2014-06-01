<?php
/*
Template Name: One-page site
*/
?>

<?php get_header(); ?>

<?php // Let's show all the static pages!
$pages = get_pages(array('child_of' => $post->ID, 'sort_column' => 'menu_order', 'sort_order' => 'asc')); 
$count = 1;
foreach ($pages as $post) :
    setup_postdata($post);
    ?>
    <div id="<?php echo the_slug(); ?>" class="page-panel" data-slide="<?php echo $count; ?>" data-stellar-background-ratio="0.5">
    
    <?php if (the_slug() == "news"): ?>
        <img id="smoke-two" src="<?php echo get_template_directory_uri(); ?>/library/images/smoky.png" alt="Smoke Layer" data-stellar-ratio="2.5" />
    <?php endif; ?>
    
        <div class="inner-content wrap clearfix">
            <div class="twelvecol first last clearfix entry-content" role="main">
                <?php if (the_slug() != "home"):  echo the_title('<h1>', '</h1>');  endif; ?>
                <?php echo the_content(); ?>
                
                <?php if (the_slug() == "news"): ?>
                    <?php get_template_part('news'); ?>
                    <div class="twelvecol first last clearfix center"><a class="button" href="/news">Read all news posts</a></div>
                <?php endif; ?> 
            
            </div>
        </div>
        
        <?php if (the_slug == "news"): ?>
            <a class="direction-button up" data-slide="1" title="Back to top"></a>
        <?php else: ?>
            <div class="skip-text"><h3>Skip this page?</h3></div>
            <a class="direction-button down" data-slide="<?php echo ++$count; ?>" title="Next panel"></a>           
        <?php endif; ?>
        
    </div>
    
    
    <!-- TRANSITION SLIDES: MAY OR MAY NOT BE REQUIRED 
    <div class="middle-slide" data-stellar-background-ratio="2.5">
        
        <?php if (the_slug == "home"):  ?>
        <img id="the-books" class="middle-text" src="<?php echo get_template_directory_uri(); ?>/library/images/books.png" alt="The Books" data-stellar-ratio=".5" data-stellar-vertical-offset="350" />
        <img class="angel" src="<?php echo get_template_directory_uri(); ?>/library/images/angel.png" alt="fleuron" data-stellar-ratio="1.5" data-stellar-vertical-offset="500" />
        
        <?php elseif (the_slug == "books"):  ?>
        <img id="the-author" class="middle-text" src="<?php echo get_template_directory_uri(); ?>/library/images/author.png" alt="The Author" data-stellar-ratio=".5" data-stellar-vertical-offset="350" />
        <img class="angel" src="<?php echo get_template_directory_uri(); ?>/library/images/angel.png" alt="fleuron" data-stellar-ratio="1.5" data-stellar-vertical-offset="500" />
        
        <?php elseif (the_slug == "about-the-author"):  ?>
        <img id="the-news" class="middle-text" src="<?php echo get_template_directory_uri(); ?>/library/images/news.png" alt="The Latest News" data-stellar-ratio=".5" data-stellar-vertical-offset="350" />
        <img class="angel" src="<?php echo get_template_directory_uri(); ?>/library/images/angel.png" alt="fleuron" data-stellar-ratio="1.5" data-stellar-vertical-offset="500" />

        <?php elseif (the_slug == "news"):  ?>
        <img id="the-end" class="middle-text" src="<?php echo get_template_directory_uri(); ?>/library/images/end.png" alt="The End" data-stellar-ratio=".5" data-stellar-vertical-offset="350" />
        <img class="angel" src="<?php echo get_template_directory_uri(); ?>/library/images/angel.png" alt="fleuron" data-stellar-ratio="1.5" data-stellar-vertical-offset="500" />

        <?php endif; ?>
        
    </div>
    -->
    
<?php endforeach; ?>
<?php wp_reset_postdata(); ?>

<img id="smoke" src="<?php echo get_template_directory_uri(); ?>/library/images/smoke.png" alt="smoke" width="547" height="820" data-stellar-ratio="3.5"/>

<?php get_footer(); ?>
